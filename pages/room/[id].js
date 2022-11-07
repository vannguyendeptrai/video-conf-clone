import Script from "next/script"
import { useRouter } from "next/router"

export default function Room() {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <Script
                src='https://unpkg.com/peerjs@1.4.5/dist/peerjs.min.js'
                onLoad={async () => {
                    const peer = new Peer(`room-${id}-first`)
                    const localStream = await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true,
                    })

                    document.querySelector('video#local').srcObject = localStream

                    peer.on('call', (call) => {
                        call.answer(localStream)
                    
                        call.on('stream', (remoteStream) => {
                          document.querySelector('video#remote').srcObject = remoteStream
                        })
                    })
                }}
            />
            <h1 className='mt-20 text-center text-3xl uppercase font-black'>
                Room
            </h1>

            <p className='mt-20 mb-20 text-center text-3xl font-black'>
                Share this link to join the room: <br />
                <a href={`/room/${id}/join`} className='underline'>
                    http://localhost:3000/room/{id}/join
                </a>
            </p>
            <div className='flex'>
                <video id='local' autoPlay playsInline muted></video>                
				<video id='remote' autoPlay playsInline></video>
            </div>
        </>
    )
}

export async function getServerSideProps(context){
    return{
        props:{}
    }
}