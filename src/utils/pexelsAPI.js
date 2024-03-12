import axios from 'axios';

export default axios.create({
    baseURL: `https://api.pexels.com`,
    headers: {
    Authorization:"9yWaKih4SLHJQpPCwk1vYFdHO8hibMk1va9EQUaVQrlxo2EpegkhDI3X"
    }
});
