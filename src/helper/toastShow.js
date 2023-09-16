import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toastShow = (message , status) => {
    if(status == true){
        toast.success(message , {
        autoClose: 1000,
      })
    }else{
      toast.error(message , {
      autoClose: 1000,
    })
  
    }
  }

  export default toastShow