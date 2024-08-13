import { InfinitySpin } from "react-loader-spinner";

function Loader() {
   return (
     <InfinitySpin
       visible={true}
       width="200"
      //  color="#4fa94d"
       color="#ffffff"
       ariaLabel="infinity-spin-loading"
     />
   );
}

export default Loader