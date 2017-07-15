import {h, Component} from "preact"
import {injectGlobal} from "styled-components"
import * as Three from "three"

injectGlobal`
  body {
    margin: 0;
  }

  canvas {
    width: 100%;
    height: 100%;
  }
`

class Scene extends Component {
  scene = new Three.Scene()
  renderer = new Three.WebGLRenderer({alpha: true})

  componentDidMount() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.dom.appendChild(this.renderer.domElement)

    this.create()
    this.update()
  }

  componentWillReceiveProps(props) {
    if (props.zoom !== this.props.zoom) {
      this.camera.fov = props.zoom
      this.camera.updateProjectionMatrix()
    }
  }

  create = () => {
    const size = window.innerWidth / window.innerHeight
    this.camera = new Three.PerspectiveCamera(this.props.zoom, size, 0.1, 1000)

    const geometry = new Three.BoxGeometry(1.3, 1, 1)
    const material = new Three.MeshBasicMaterial({color: 0x2ecc71, wireframe: true})
    this.cube = new Three.Mesh(geometry, material)
    this.scene.add(this.cube)
    this.camera.position.z = 5

    this.renderer.setClearColor(0x2c3e50, 1)

    console.log("Created a cube:", this.cube)
  }

  update = () => {
    requestAnimationFrame(this.update)
    this.cube.rotation.x += 0.1
    // this.cube.rotation.y += 0.1
    this.cube.translateZ(0.05)
    // this.cube.translateX(0.01)

    this.renderer.render(this.scene, this.camera)
  }

  ref = r => {
    this.dom = r
  }

  render = () => (
    <div ref={this.ref} />
  )
}

export default class App extends Component {
  state = {zoom: 50}

  zoomIn = () => this.state.zoom >= 0 && this.setState({zoom: this.state.zoom - 5})
  zoomOut = () => this.state.zoom <= 95 && this.setState({zoom: this.state.zoom + 5})

  render = (props, {zoom}) => (
    <div>
      <Scene zoom={zoom} />
      <button onClick={this.zoomIn}>In</button>
      <button onClick={this.zoomOut}>Out</button>
    </div>
  )
}
