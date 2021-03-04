import simpleGit, {SimpleGit} from 'simple-git';

const git: SimpleGit = simpleGit();

// this will create a new branch and clear the local stashes
// it will add the fargate-files folder
// send to a remote url
function build() {
    git.checkoutLocalBranch('sending-to-remote');
    git.branch(['--orphan']);
    git.rm(['--cached', '-r', '.']);
    git.add('fargate-files');
    git.commit('sending fargate files to commit repo!!');
    // will add repo url as variable
    git.addRemote('test', 'https://tfs-svm.visualstudio.com/UA-Capstone-2021/_git/terraform-fargate-test');
    git.push(['-u', 'test', 'sending-to-remote'], () => console.log('done'));
  // console.log(git.status());
} 
build();