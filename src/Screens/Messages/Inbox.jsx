import allInbox from "../../Lib/AllInbox";
import MemoList from "../../Components/MemoList";

const Sent = () => {
  return <MemoList fetchMemos={allInbox} pageTitle="Sent Memos" />;
};

export default Sent;
