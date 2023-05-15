import {defineStore} from "pinia";
import {toast} from "vue3-toastify";
import {io} from "socket.io-client"

export const useSocketStore = defineStore('socket', {
    state: () => ({
        isConnect: false,
        socket: null
    }),
    actions: {
        connect() {
            if (this.isConnect) return
            this.socket = io('/')
            this.socket.on('my-name-is', (data) => {
                toast.success('Connect to: ' + data)
            })
            this.socket.on('ping', (data) => {
                toast.info(data)
            })
            this.isConnect = true

            this.socket.on('disconnect', (data) => {
                toast.error(data)
                this.isConnect = false
            })

        }
    }
})