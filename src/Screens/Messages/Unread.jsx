import Unviewed from "../../Lib/UnviewedMemo";
import MemoList from "../../Components/MemoList";

const Unread = () => {
  return <MemoList fetchMemos={Unviewed} pageTitle="Unread Memos" />;
};

export default Unread;
