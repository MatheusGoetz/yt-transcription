import axios from 'axios'
import { startLoading, stopLoading, loadingMessage } from "./loading";
import { loadVideo, getVideoId } from "./youtube-api";

const form = document.querySelector('#form');

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  try {
    loadingMessage('Baixando e convertendo vídeo')
    startLoading()

    const formdata = new FormData(form)
    const url = formdata.get('url')
    await loadVideo(url)

    await axios.get('http://localhost:3333/audio?v=' + getVideoId(url) )
  } catch (error){
    console.log('[SUBMIT_ERROR]', error)
  } finally {
    stopLoading()
  }
})