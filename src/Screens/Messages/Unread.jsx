import allUnread from "../../Lib/Unread";
import MemoList from "../../Components/MemoList";

const Unread = () => {
  return <MemoList fetchMemos={allUnread} pageTitle="Unread Memos" />;
};

export default Unread;
