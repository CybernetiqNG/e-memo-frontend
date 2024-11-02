import Pending from "../../Lib/Pending";
import MemoList from "../../Components/MemoList";

const Sent = () => {
  return <MemoList fetchMemos={Pending} pageTitle="Pending Memos" />;
};

export default Sent;
