import dynamic from 'next/dynamic'
 
const DynamicChatWrapper = dynamic(() => import('./ChatWrapper'), {
  ssr: false,
})

export default DynamicChatWrapper