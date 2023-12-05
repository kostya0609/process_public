import Process from "@/plugins/business_process/components/Process";
import {ElNotification} from "element-plus";
let installed = false;

export default {
    install(app, options){
       if (installed) return;

        installed = true;

        const notify       = ({title = '', message = '', type = '', duration = 3000} = {}) => {
            ElNotification({
                title,
                message,
                type,
                duration,
                dangerouslyUseHTMLString: true,
            })
        };

        app.component('Process', Process);

        app.provide('_business_process_notify', notify);
        app.provide('_business_process_user_id', options.user_id);
    }
}