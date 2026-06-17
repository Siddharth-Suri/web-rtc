const connection = new connectToWebRTC('stun:stun.l.google.com:19302');
class connectToWebRTC {

    constructor(stunServerUrl){
        this.device = new RTCPeerConnection({
            iceServers:[{
                urls: stunServerUrl
            }]
        }) 
        this.localSDP = null
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
        
        
        this.localSDP = this.device.localDescription.sdp
        console.log("SDP String: "+ this.localSDP)
    }
    
    // Called by person2
    async establishConnectionRemote(){
        const value = JSON.parse(document.getElementById("remote-string").value)
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
        console.log(answer)
        return this.device.localDescription.sdp
    }

    // Called by person1 after having answer string
    async finalizeConnection(){
        const value = JSON.parse(document.getElementById("finalize-string").value)
        await this.device.setRemoteDescription(value)
    }
}
    
function createOffer() {
    connection.establishConnectionLocal();
}