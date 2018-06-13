/* jshint esversion: 6 */
import React, { Component } from 'react';
import './App.css';
import Track from './components/Track/';
import Week from './components/Week/';
import AddTrackForm from './components/AddTrackForm/';
import Settings from './components/Settings/';

//TODO der skal tegnes meget snart
class App extends Component {
  constructor(props){
    super(props);
    if(localStorage.getItem("timelines")){
      let timelines = localStorage.getItem("timelines");
      timelines = JSON.parse(timelines);
      this.state=timelines;
    } else {
      this.state = this.getInitialData();
    }
  }
  save(){
    localStorage.setItem("timelines", JSON.stringify(this.state));
  }
  getInitialData(){
    const weeks=[];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    for(let w=0; w<12; w++){
      let week=[];
      for(let d=0; d<5; d++){
        week.push(days[d]);
      }
      weeks.push(week);
    }
    const defaultTracks = [//this is bad, duplicate code
      {
        name: "git",
        color: "#bada55"
      },
      {
        name: "tools",
        color: "#c0ffee"
      },
      {
        name: "HTML",
        color: "#b000b5"
      },
      {
        name: "CSS",
        color: "#C55"
      },
      {
        name: "SVG",
        color: "#FB1"
      },
      {
        name: "JS",
        color: "#707020"
      }
  ];
  defaultTracks.forEach(track=>{
    let ar=[];
    for(let i=0; i<12*5; i++){
      ar.push({
        id: i,
        value: ''
      });
    }
    track.slots= ar;
  });
    

    return {
      tracks: defaultTracks,
      showSettings: false,
      weeks: weeks,
      showTrackForm: false
    };
  }
  showTrackForm(e){
    this.setState({
      showTrackForm: !this.state.showTrackForm
    });
    this.save();
  }
  trackAdded(e){
    const tracks = this.state.tracks;
    tracks.push(e);
    this.setState({
      tracks: tracks,
      showTrackForm: false
    });
    this.save();
  }
  slotsReordered(newOrder, trackId){
    const tracks = this.state.tracks;
    tracks[trackId].slots=newOrder;
    this.setState({
      tracks:tracks
    });
    this.save();
  }
  slotChanged(tid,sid,newVal){
    const tracks = this.state.tracks;
    
    let index = tracks[tid].slots.findIndex(el=>el.id===sid);
    tracks[tid].slots[index].value=newVal;
    this.setState({
      tracks: tracks
    });
    this.save();
  }
  showSettings(){
    const newValue = !this.state.showSettings;
    this.setState({
      showSettings:newValue
    });
    
  }
  render() {
    const weeks = this.state.weeks.map((w,i) => <Week key={i} data={w} />);
    const tracks = this.state.tracks.map((t,i)=><Track 
      slotsReordered={this.slotsReordered.bind(this)} 
      slotChanged={this.slotChanged.bind(this)}
      key={i} 
      data={t} 
      tid={i}
    />);
    const trackNames = this.state.tracks.map((t,i)=><h3 key={i}>{t.name}</h3>)
    return (
      <div className="App">
        <aside>
          <div onClick={this.showSettings.bind(this)}><i className="fas fa-cogs"></i></div>
          {this.state.showSettings ? <Settings /> : ''}
          <h3>Tracks</h3>
          <button onClick={el => this.showTrackForm(el)}>Add Track</button>
          {this.state.showTrackForm ? <AddTrackForm onTrackAdded={el=>this.trackAdded(el)} /> : ''}
        </aside>
        <section className="weeks">
          {weeks}
        </section>
        <aside className="trackNames">
          {trackNames}
        </aside>
        <section className="tracks">
          {tracks}
        </section>
        <h4>Notes</h4>
        <ol>
          <li>Click add track to create a new track (like JS/SVG/Tools)</li>
          <li>Click a day in a track to change it's content</li>
          <li>Drag And Drop to reorder inside a track</li>
          <li>Live with the amount of bugs</li>
        </ol>
      </div>
    );
  }
}
export default App;