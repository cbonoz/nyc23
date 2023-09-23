import { useEnsAvatar, useEnsName } from 'wagmi'

// https://docs.ens.domains/dapp-developer-guide/quickstart#reverse-resolution/

function EnsAvatar() {
  const address = '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5'
  const ensName = useEnsName({ address, chainId: 1 })
  const ensAvatar = useEnsAvatar({ name: ensName.data, chainId: 1 })

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
          ? 'Error loading name'
          : ensName.isLoading
          ? 'Loading...'
          : ensName.data || 'No name set'}
      </span>
      
    </div>
  )
}

export default EnsAvatar