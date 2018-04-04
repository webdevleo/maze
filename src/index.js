import BinaryTree from './js/BinaryTree';
import Sidewinder from './js/Sidewinder';
import Grid from './js/Grid';

document.getElementById('app'). innerHTML = `
<h2>Binary Tree Algorithm:</h2>
<pre>${BinaryTree.create(new Grid(10, 10))}</pre>
<h2>Sidewinder Algorithm:</h2>
<pre>${Sidewinder.create(new Grid(10, 10))}</pre>
`;