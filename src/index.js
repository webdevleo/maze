import BinaryTree from './js/BinaryTree';
import Grid from './js/Grid';

const maze = BinaryTree.create(new Grid(50, 80));

document.getElementById('app').innerHTML = `<pre>${maze.toString()}</pre>`;