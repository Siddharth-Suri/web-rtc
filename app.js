class getValues {
    device 
    localSDP
    offer 


    constructor(stunServerUrl){
        this.device = new RTCPeerConnection({
            iceServers:[{
                urls: stunServerUrl
            }]
        }) 
        this.localSDP = null
    }

    async establishConnectionLocal(){
        this.offer = await this.device.createOffer()
        await this.device.setLocalDescription(this.offer)

        await new Promise((resolve)=>{
            this.device.onicecandidate = (event) => {
                
            }
        })
    }
}