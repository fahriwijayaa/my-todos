import { NoteCard } from "./NoteCard";

function NoteList(props) {
  const { notes, onDelete } = props;

  return (
    <div>
      {notes.map((note, index) => {
        const createdAtDate = new Date(note.createdAt);
        createdAtDate.setDate(createdAtDate.getDate());
        const day = String(createdAtDate.getDate()).padStart(2, "0");
        const month = String(createdAtDate.getMonth() + 1).padStart(2, "0");
        const year = createdAtDate.getFullYear();
        const newCreatedAt = `${day}-${month}-${year}`;
        return (
          <NoteCard
            key={note.id}
            no={index + 1}
            index={index}
            id={note.id}
            title={note.title}
            createdAt={newCreatedAt}
            onDelete={onDelete}
          >
            {note.body}
          </NoteCard>
        );
      })}
    </div>
  );
}

export default NoteList;
