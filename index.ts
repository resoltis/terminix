import simpleGit, {SimpleGit} from 'simple-git';

const git: SimpleGit = simpleGit();

// this will create a new branch and clear the local stashes
// it will add the CFT Files folder
// send to a remote url
function build() {
  
  git.rm(['--cached','-r','.']);
  git.checkoutLocalBranch('sending-to-remote-CFT');
  git.branch(['--orphan']);
  git.clean('-f');
  git.add('CFT Files');
  git.commit('sending cft to commit repo!!');
  // will add repo url as variable
  git.addRemote('test', 'https://tfs-svm.visualstudio.com/UA-Capstone-2021/_git/terraform-fargate-test');
  git.push(['-u','test', 'sending-to-remote-CFT'], () => console.log('done'));
  git.init();
  git.checkoutBranch('main', 'origin');
  git.reset(['HEAD^', '--hard']);
  
} 
build();