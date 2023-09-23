import { useEnsAvatar, useEnsName } from 'wagmi'

// https://docs.ens.domains/dapp-developer-guide/quickstart#reverse-resolution/

function EnsAvatar({chainId, address}) {
  const ensName = useEnsName({ address, chainId })
  const ensAvatar = useEnsAvatar({ name: ensName.data, chainId })

  return (
    <div
      style={{
        // display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <img
        src={ensAvatar.data || 'https://i.imgur.com/UhV7H97.jpeg'}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
      />
      <span className='ens-name'>
        {ensName.isError
          ? ''
          : ensName.isLoading
          ? 'Loading...'
          : ensName.data || ''}
      </span>
      
    </div>
  )
}

export default EnsAvatar