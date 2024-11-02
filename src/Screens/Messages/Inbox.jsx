import allInbox from "../../Lib/AllInbox";
import MemoList from "../../Components/MemoList";

const Sent = () => {
  return <MemoList fetchMemos={allInbox} pageTitle="Inbox Memos" />;
};

export default Sent;
