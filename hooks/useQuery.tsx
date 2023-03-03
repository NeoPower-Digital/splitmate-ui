import metadata from '@/contracts/contract-metadata.json';
import { Queries } from '@/model/blockchain';
import { accountAtom } from '@/states/account.atom';
import { networkAtom } from '@/states/network.atom';
import { polkadotAPIAtom } from '@/states/polkadotAPI.atom';
import { ContractPromise } from '@polkadot/api-contract';
import { Signer } from '@polkadot/api/types';
import { WeightV2 } from '@polkadot/types/interfaces';
import { useAtom } from 'jotai';

const emptyPromise: Promise<unknown> = new Promise(() => null);
const emptyGetPromise = {
  getPromise: () => emptyPromise,
};

const useQuery = () => {
  const [{ contractAddress }] = useAtom(networkAtom);
  const [account] = useAtom(accountAtom);
  const [api] = useAtom(polkadotAPIAtom);

  if (!api) return emptyGetPromise;

  console.log('USE QUERY', { account, api });

  api.setSigner(account?.signer as Signer);
  const contract = new ContractPromise(api, metadata, contractAddress);

  const accountAddress = account?.address || '';

  if (!contract) return emptyGetPromise;
  if (!accountAddress) return emptyGetPromise;

  const gasLimitToSimulate = api?.registry.createType('WeightV2', {
    refTime: Number.MAX_SAFE_INTEGER,
    proofSize: Number.MAX_SAFE_INTEGER,
  }) as WeightV2;

  const getPromise = (
    message: Queries,
    ...params: Array<unknown>
  ): Promise<unknown> => {
    console.log('🚀QUERY...', {
      network: api.runtimeChain.toHuman(),
      contract: contract.address.toHuman(),
    });

    return contract!.query[message](
      accountAddress!,
      {
        gasLimit: gasLimitToSimulate,
      },
      ...params
    ).then(({ output }) => {
      const data: any = output?.toHuman();
      return data['Ok'];
    });
  };

  return { getPromise };
};

export default useQuery;
