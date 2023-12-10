import img from '../../assets/Image/img2.jpg'
import img2 from '../../assets/Image/img5.jpg'
import AdminExtra from '../AdminExtra/AdminExtra';


const AdminHome = () => {
    return (
        <div>
            {/* Extra 1 */}
            <div className="diff h-[600px] aspect-[16/9] ">
                <div className="diff-item-1">
                    <div className="bg-[#5e5c80] text-primary-content text-9xl font-black grid place-content-center  ">
                        <img src={img2} alt="" />
                    </div>
                </div>
                <div className="diff-item-2">
                    <div className="bg-base-200 text-9xl font-black grid place-content-center">
                        <img src={img} alt="" />
                    </div>
                </div>
                <div className="diff-resizer"></div>
            </div>
            <AdminExtra></AdminExtra>
        </div>
    );
};

export default AdminHome;