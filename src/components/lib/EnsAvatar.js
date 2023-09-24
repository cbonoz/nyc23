import { useEnsAvatar, useEnsName } from 'wagmi'
import { isEmpty } from '../../util';

// https://docs.ens.domains/dapp-developer-guide/quickstart#reverse-resolution/

function EnsAvatar({chainId, identities, data}) {
  const address = isEmpty(identities) ? '' : identities[0].address;
  const ensName = useEnsName({ address, chainId })
  const ensAvatar = useEnsAvatar({ name: ensName.data, chainId })

  const firstAvatar = (identities || []).find((identity) => !!identity.avatar)?.avatar;

  return (
    <div
      style={{
        // display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '10px',
        margin: '10px'
      }}
    >
      <img
        src={ensAvatar.data || firstAvatar || 'https://i.imgur.com/UhV7H97.jpeg'}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
      />
      <span>
        {ensName.isError
          ? ''
          : ensName.isLoading
          ? 'Loading...'
          : ensName.data || ''}
      </span>
      <h1>{data?.name}</h1>
      <span>
        {data?.ens}
        </span>
    </div>
  )
}

export default EnsAvatar