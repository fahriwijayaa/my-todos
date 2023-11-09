import "./App.css";

function Todos1(props) {
  return (
    <>
      <div class="card mb-5">
        <div class="card-body text-bg-primary">
          <h5 class="text-bg-primary">Tugas Pemrograman Web</h5>
          <p class="card-text">Membuat aplikasi todo dengan react js</p>
        </div>
        <div class="card-footer text-body-secondary text-center text-bg-warning">
          {props.footer}
        </div>
      </div>
    </>
  );
}
function Todos2(props) {
  return (
    <>
      <div class="card mb-5">
        <div class="card-body text-bg-primary">
          <h5 class="text-bg-primary">Tugas MSIB</h5>
          <p class="card-text">
            Membuat project IP Server sebagai tugas akhir backend
          </p>
        </div>
        <div class="card-footer text-body-secondary text-center text-bg-warning">
          {props.footer}
        </div>
      </div>
    </>
  );
}
function Todos3(props) {
  return (
    <>
      <div class="card mb-5">
        <div class="card-body text-bg-primary">
          <h5 class="text-bg-primary">Tugas MSIB</h5>
          <p class="card-text">Mengerjakan Logbook harian</p>
        </div>
        <div class="card-footer text-body-secondary text-center text-bg-warning">
          {props.footer}
        </div>
      </div>
    </>
  );
}

function App() {
  const name = "Fahri";
  return (
    <div className="App" class="App-header">
      <h1 class="text-center">Todo List {name}</h1>
      <div class="layout">
        <Todos1 footer="05/11/2023" />
        <Todos2 footer="05/11/2023" />
        <Todos3 footer="05/11/2023" />
      </div>
    </div>
  );
}

export default App;
