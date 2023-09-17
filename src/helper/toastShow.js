import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toastShow = (message , status , autoClose = 1000) => {
    if(status == true){
        toast.success(message , {
        autoClose: autoClose,
      })
    }else{
      toast.error(message , {
      autoClose: autoClose,
    })
  
    }
  }

  export default toastShow