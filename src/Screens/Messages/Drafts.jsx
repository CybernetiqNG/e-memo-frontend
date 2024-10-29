import allDrafts from "../../Lib/Drafts";
import MemoList from "../../Components/MemoList";

const Drafts = () => {
  return <MemoList fetchMemos={allDrafts} pageTitle="Drafts Memos" />;
};

export default Drafts;
