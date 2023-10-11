import TrenerProfilePage from "../TrenerProfilePage";
import StudentProfilePage from "../StudentProfilePage";
import ZaposleniProfilePage from "../ZaposleniProfilePage";

export default function Profile(props) {
    const role = localStorage.getItem("role");
    if (role === "Student") {
        return <StudentProfilePage {...props} />;
    }
    else if(role === "Trener") {
        return <TrenerProfilePage {...props} />;
    }
    else
        return <ZaposleniProfilePage {...props} />;
}