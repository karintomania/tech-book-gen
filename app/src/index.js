import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as htmlToImage from 'html-to-image';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title:'Javascript',
      subTitle:'入門',
      author:'尾来　理太郎',
      lead:'Javascript for Beginners',
      animal:'owl',
      color:'#009e9a',
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubTitleChange = this.handleSubTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleLeadChange = this.handleLeadChange.bind(this);
    this.handleAnimalChange = this.handleAnimalChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleOnGenerate = this.handleOnGenerate.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleSubTitleChange(event) {
    this.setState({subTitle: event.target.value});
  }

  handleAuthorChange(event) {
    this.setState({author: event.target.value});
  }

  handleColorChange(event) {
    this.setState({color: event.target.value});
  }

  handleAnimalChange(event) {
    this.setState({animal: event.target.value});
  }

  handleLeadChange(event) {
    this.setState({lead: event.target.value});
  }

  handleOnGenerate(event){
    event.preventDefault();

    // https://betterprogramming.pub/heres-why-i-m-replacing-html2canvas-with-html-to-image-in-our-react-app-d8da0b85eadf
    // https://javascript.plainenglish.io/export-react-components-as-images-15168b73b0eb
    const saveAs = (blob, fileName) =>{
      var elem = window.document.createElement('a');
      elem.href = blob
      elem.download = fileName;
      elem.style = 'display:none;';
      (document.body || document.documentElement).appendChild(elem);
      if (typeof elem.click === 'function') {
        elem.click();
      } else {
        elem.target = '_blank';
        elem.dispatchEvent(new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        }));
      }
      URL.revokeObjectURL(elem.href);
      elem.remove()
      }

    htmlToImage.toPng(document.getElementById('preview-container'))
      .then(function (dataUrl) {
        saveAs(dataUrl, 'book-cover.png');
      });
  }


  render(){
    return ( 
      <>
        <header>
          <span class='nowrap'>存在しない技術書</span>
          <span class='nowrap'>ジェネレーター</span>
        </header>
        <main class="container">
          <form>
            <div>
              <label>タイトル : (\nで改行)</label>
              <input type="text" name="title" onChange={this.handleTitleChange} placeholder='例) Javascript'/>
            </div>
            <div>
              <label>サブタイトル :</label>
              <input type="text" name="subTitle" onChange={this.handleSubTitleChange} placeholder='例) 入門' />
            </div>
            <div>
              <label>著者 :</label>
              <input type="text" name="author" onChange={this.handleAuthorChange}  placeholder='例) 尾来　理太郎'/>
            </div>
            <div>
              <label>リード文 : (英字推奨)</label>
              <input type="text" name="lead" onChange={this.handleLeadChange} placeholder='例) Javascript for Beginners' />
            </div>
            <div>
              <label> 動物: </label>
              <select onChange={this.handleAnimalChange} >
                <option value='owl'>ふくろう</option>
                <option value='owl2'>ふくろう 2</option>
                <option value='armadillo'>あるまじろ</option>
                <option value='penguin'>ぺんぎん</option>
                <option value='crab'>かに</option>
                <option value='horse'>うま</option>
                <option value='horse2'>うま ２</option>
                <option value='bat'>こうもり</option>
                <option value='rat'>ねずみ</option>
              </select>
            </div>
            <div>
              <label> 色: </label>
              <select id='color-select' onChange={this.handleColorChange} >
                <option value='#65161c' style={{background:'#65161c'}}>茶色</option>
                <option value='#941b2a' style={{background:'#941b2a'}}>あか　1</option>
                <option value='#b80721' style={{background:'#b80721'}}>あか　2</option>
                <option value='#e11105' style={{background:'#e11105'}}>あか　3</option>
                <option value='#f7b500' style={{background:'#f7b500'}}>きいろ</option>
                <option value='#6a8922' style={{background:'#6a8922'}}>みどり　1</option>
                <option value='#378e19' style={{background:'#378e19'}}>みどり　2</option>
                <option value='#008445' style={{background:'#008445'}}>みどり　3</option>
                <option value='#00999d' style={{background:'#00999d'}} selected>みどり　4</option>
                <option value='#067bb0' style={{background:'#067bb0'}}>あお　1</option>
                <option value='#014284' style={{background:'#014284'}}>あお　2</option>
                <option value='#000f76' style={{background:'#000f76'}}>あお　3</option>
                <option value='#503dbd' style={{background:'#503dbd'}}>むらさき　1</option>
                <option value='#a8009b' style={{background:'#a8009b'}}>むらさき　2</option>
                <option value='#512885' style={{background:'#55135d'}}>むらさき　3</option>
                <option value='#71706e' style={{background:'#71706e'}}>灰色</option>
              </select>
            </div>
          </form>
          <div class='preview-wrap'>
            <h2>表紙プレビュー</h2>
          <Preview
            title={this.state.title}
            subTitle={this.state.subTitle}
            author={this.state.author}
            lead={this.state.lead}
            animal={this.state.animal}
            color={this.state.color}
          />
          <button onClick={this.handleOnGenerate}>Download</button>
          </div>
        </main>
      </>);
  }
}

class Preview extends React.Component{

  render(){
    const bgColor = this.props.color;
    const imgSrc = `${process.env.PUBLIC_URL}/img/${this.props.animal}.png`;
    const author = (this.props.author.length > 0) ? this.props.author + '　著' : '';
    const title = this.props.title.replace('\\n', "\n");
    return (
      <div id='preview-container' class='preview-container'>
        <div class='head-square' style={{background:bgColor}}></div>
        <div class='lead'>{this.props.lead}</div>
        <img src={imgSrc} />
        <div class='sub-title-container'>
          {this.props.subTitle}
        </div>
        <div class='title-container' style={{background:bgColor}}>
          {title}
        </div>
        <div class='author-container' >
          {author}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
