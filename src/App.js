import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

// prettier-ignore
function randomName() {
  const nadimci = [
    "Šašavi",
    "Ljigavi",
    "Mrgudni",
    "Mazni",
    "Štrkljasti",
    "Bucmast",
    "Cvrčak",
    "Cijukaljka",
    "Krpelj",
    "Žabac",
    "Mjaukalo",
    "Režalica",
    "Vragolan",
    "Japica",
    "Škrgutalo",
    "Majmunče",
    "Skitalica",
    "Cvrkutan",
    "Mrmot",
    "Slinavi",
    "Krkotreb",
    "Čuperko",
    "Mrki",
    "Mamurluk",
    "Skakutalo",
    "Njuškalo",
    "Mrvica",
    "Šuškalo",
    "Zveketalo",
    "Skicola",
    "Trljan",
    "Malošap",
    "Jutarnjak",
    "Blatnjavi",
    "Vražić",
    "Mališan",
    "Sjajko",
    "Tupoguz",
    "Ljubimko",
    "Miško",
    "Krzneno",
    "Hrskavo",
    "Mačor",
    "Ribica",
    "Pužić",
    "Ljigavko",
    "Medvjedić",
    "Mazilica",
    "Mrav",
    "Riba",
    "Sirena",
    "Lisica",
    "Ptica",
    "Krtica",
    "Konjić",
    "Pčelica",
    "Vuk",
    "Žirafa",
    "Mišić",
    "Koala",
    "Panda",
    "Krokodil",
    "Jež",
    "Pauk",
    "Vjeverica",
    "Slon",
    "Zečić",
    "Leopard",
    "Tigar",
    "Golub",
    "Zebra"
  ];

  const zivotinje = [
    "slon",
    "riba",
    "ptica",
    "konj",
    "mačka",
    "pas",
    "žirafa",
    "miš",
    "tigar",
    "zebra",
    "lav",
    "medvjed",
    "vuk",
    "krokodil",
    "pčela",
    "krtica",
    "paun",
    "vjeverica",
    "kamila",
    "žaba",
    "jež",
    "pauk",
    "soko",
    "ždral",
    "koala",
    "pingvin",
    "leopard",
    "papiga",
    "golub",
    "zmija"
  ];

  const randomNadimak = nadimci[Math.floor(Math.random() * nadimci.length)];
  const randomZivotinja = zivotinje[Math.floor(Math.random() * zivotinje.length)];

  return randomNadimak + " " + randomZivotinja;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      member: {
        username: randomName(),
        color: randomColor(),
      },
    };
    this.drone = new window.Scaledrone("ikTrmoYNY32RAGbv", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Chat aplikacija za seminarski rad</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;
