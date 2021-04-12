import simpleGit, {SimpleGit} from 'simple-git';

const git: SimpleGit = simpleGit();

// this will create a new branch and clear all untracked files
// it will add the CFT Files folder when it is created
// add a commit message and add a remote repository variable surveyed by the user
// push the new branch to the remote repo
function build() {
  git.checkoutLocalBranch('sending-to-remote-CFT');
  git.clean('-f');
  git.add('CFT Files');
  git.commit('sending cft files to a remote repository');
  // will add repo url as variable
  git.addRemote('test', 'https://tfs-svm.visualstudio.com/UA-Capstone-2021/_git/terraform-fargate-test');
  git.push(['-u','test', 'sending-to-remote-CFT'], () => console.log('done'));
} 
build();