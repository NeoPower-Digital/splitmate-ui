import metadata from '@/contracts/contract-metadata.json';
import { accountAtom } from '@/states/account.atom';
import { networkAtom } from '@/states/network.atom';
import { polkadotAPIAtom } from '@/states/polkadotAPI.atom';
import { ContractPromise } from '@polkadot/api-contract';
import { Signer } from '@polkadot/api/types';
import { WeightV2 } from '@polkadot/types/interfaces';
import { useAtom } from 'jotai';

const useTransaction = (
  setIsLoading: (value: boolean) => void,
  setIsFinished: (value: boolean) => void,
  setIsError: (value: boolean) => void
) => {
  const [{ contractAddress }] = useAtom(networkAtom);
  const [account] = useAtom(accountAtom);
  const [api] = useAtom(polkadotAPIAtom);

  if (!api) return { send: () => {} };

  console.log('USE TRANSACTION', { account, api });

  api.setSigner(account?.signer as Signer);
  const contract = new ContractPromise(api, metadata, contractAddress);

  const accountAddress = account?.address || '';

  if (!contract) return { send: () => {} };
  if (!accountAddress) return { send: () => {} };

  const gasLimitToSimulate = api.registry.createType('WeightV2', {
    refTime: Number.MAX_SAFE_INTEGER,
    proofSize: Number.MAX_SAFE_INTEGER,
  }) as WeightV2;

  const send = (
    messageName: 'award' | 'distributeRewards',
    ...params: any[]
  ) => {
    // LOADING
    setIsLoading(true);

    // TODO: Remove guard
    console.log('🚀TX...', {
      network: api.runtimeChain.toHuman(),
      contract: contract.address.toHuman(),
    });

    contract.query[messageName](
      accountAddress,
      {
        gasLimit: gasLimitToSimulate,
      },
      ...params
    ).then(({ gasRequired, result }) => {
      console.log({ query_result: result });

      if (!result.isOk) {
        setIsLoading(false);
        setIsError(true);
        setIsFinished(true);

        return;
      }

      const gasLimit = api.registry.createType(
        'WeightV2',
        gasRequired
      ) as WeightV2;

      contract.tx[messageName](
        {
          gasLimit,
        },
        ...params
      )
        .signAndSend(accountAddress, (result) => {
          console.log({ tx_result: result });

          if (result.status.isFinalized) {
            setIsLoading(false);
            setIsFinished(true);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          setIsFinished(true);

          console.error({ error });
        });
    });
  };

  return { send };
};

export default useTransaction;
