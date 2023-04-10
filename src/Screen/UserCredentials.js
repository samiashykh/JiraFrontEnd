import { GitHubSignFunction } from "../ServerMethod/Servermethods";
import Jira from "./JiraWork.png"
import Github from "./GithubLogin.png"

export default function UserCredentials() {
  return (
    <div className="UserCreadentialsBase">
        <img src={Jira}/>
      
         <img className="usercredentialButtons" onClick={() => GitHubSignFunction()} src={Github}/>
         
          
        </div>

       
  );
}
