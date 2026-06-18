class connectToWebRTC {

    constructor(stunServerUrl){
        this.device = new RTCPeerConnection({
            // if anybody uses this in the future , you would need your own stun/turn servers 
            // if connection is peer to peer you won't need turn 
            // however if you talking to someone on a different network you would need turn 
            iceServers: [
                {
                  urls: "stun:stun.relay.metered.ca:80",
                }
                // add TURN servers here 
            ],
        }) 
        this.localSDP = null
        this.device.ontrack = (event) =>{
            console.log("Received remote track");
            console.log(event.streams);
            document.getElementById('remote').srcObject = event.streams[0]
        }
    }

    async startCamera(){
        const stream = await navigator.mediaDevices.getUserMedia({video:true , audio: true})
        document.getElementById('local').srcObject = stream;
        stream.getTracks().forEach(track => {
            this.device.addTrack(track, stream);
          });
    }

    // Called by person1
    async establishConnectionLocal(){
        this.offer = await this.device.createOffer()
        await this.device.setLocalDescription(this.offer)
        
        await new Promise((resolve)=>{
            this.device.onicecandidate = (event) => {
                // this needs to fire when all candidates are completed 
                // because then the final ice candidate is null which
                // ticks off the if condition
                if(!event.candidate){
                    resolve()
                }
            }
        })
        
        
        this.localSDP = this.device.localDescription
        document.getElementById('offer-out').value = JSON.stringify(this.localSDP)
    }
    
    // Called by person2
    async establishConnectionRemote(){
        const value = JSON.parse(document.getElementById("remote-string").value)
        
        if(!value) {
            console.log("empty value")
            return 
        }

        await this.device.setRemoteDescription(value)
        const answer = await this.device.createAnswer()
        await this.device.setLocalDescription(answer);

        await new Promise((resolve)=>{
            this.device.onicecandidate = (event)=>{
                if(!event.candidate){
                    resolve()
                }
            }
        })

        document.getElementById('answer-out').value = JSON.stringify(this.device.localDescription) 
        return this.device.localDescription.sdp
    }

    // Called by person1 after having answer string
    async finalizeConnection(){
        const value = JSON.parse(document.getElementById("finalize-string").value)
        await this.device.setRemoteDescription(value)
    }
}
    

const connection = new connectToWebRTC('stun:stun.l.google.com:19302');

async function createOffer() {
    const button = document.getElementById('b-1')
    button.disabled = true;
    await connection.startCamera()
    await connection.establishConnectionLocal();
}
async function acceptOffer() {
    const button = document.getElementById('b-2')
    button.disabled = true;
    await connection.startCamera()
    await connection.establishConnectionRemote();
}

async function finalize() {
    const button = document.getElementById('b-3')
    button.disabled = true;
    await connection.finalizeConnection();
}