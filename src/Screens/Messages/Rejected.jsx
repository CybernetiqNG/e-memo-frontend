import Disapproved from "../../Lib/Disapproved";
import MemoList from "../../Components/MemoList";

const Sent = () => {
  return <MemoList fetchMemos={Disapproved} pageTitle="Inbox Memos" />;
};

export default Sent;
