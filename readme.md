# WebRTC 

This is a lightweight project that I completed in a day for funsies and trying out webrtc. I was very intrigued how a single string is able to connect 2 browsers together with audio and video and if it was even possible so i wrote this code while understanding webrtc. I actually got stuck in the middle because of my stupid router (TURN issues) . If anyone wants to try this remotely with a fried, you would need a TURN server you can get free ones (I got mine from metered without credit card) , the limit is small and it consumes bandwidth quick, so maybe in the future I will try to make a local turn server or something. But anyways great learning experience

## How to use it 

### Person 1

1. Click `Step 1: Generate Offer`
2. Allow camera and microphone access
3. Copy the generated offer from the first textarea
4. Send that offer to Person 2

### Person 2

1. Paste Person 1's offer into the input field
2. Click `Step 2: Accept Offer & Generate Answer`
3. Allow camera and microphone access
4. Copy the generated answer from the second textarea
5. Send that answer back to Person 1

### Person 1 Again

1. Paste Person 2's answer into the final input field
2. Click `Step 3: Finalize Connection`
3. The peer connection should complete and remote video should appear

## Local Setup

This project is just static HTML, CSS, and JavaScript, so you only need a local HTTP server.

### Option 1: Python

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Option 2: VS Code Live Server

If you use VS Code, you can also serve the folder with the Live Server extension and open the local URL it provides.


## Future Possibilities

- ⁠mic on/off 
- ⁠⁠video on/off 
- signaling server (long polling works , but ws does the job too)
- manual bandwidth control 
- more ⁠try and catch blocks for error handling
- ⁠better theme
- making my own STUN/TURN servers 
- ⁠better camera positioning / movement / full screen mode

## Project Files

- `index.html`: page structure 
- `styles.css`: basic styling
- `app.js`: main code 
