import LoginPage from "./components/login/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import SignupForm from "./components/login/SignupForm";
import Root from "./components/Root";
import Main from "./components/views/Main";
import Dashboard from "./components/views/menu/dashboard/Dashboard";
import Tests from "./components/views/menu/test/Tests";
import Candidates from "./components/views/menu/candidate/Candidates";
import Result from "./components/views/menu/Result";
import Support from "./components/views/settings/Support";
import Profile from "./components/views/settings/Profile";
import Settings from "./components/views/settings/Settings";
import Landinpage from "./components/Homepage/LandingPage";
import TestList from "./components/views/menu/test/TestList";
import CreatTest from "./components/views/menu/test/CreateTest";
import Questions from "./components/views/menu/questions/Questions";
import QuestionList from "./components/views/menu/questions/QuestionList";
import CreateQuestion from "./components/views/menu/questions/CreateQuestion";
import QuestionDetail from "./components/views/menu/questions/QuestionDetail";
import CandidateList from "./components/views/menu/candidate/CandidateList";
import CandidateDetails from "./components/views/menu/candidate/CandidateDetails";
import CandidateSignup from "./components/Candidate/CandidateSignup";
import CandidateLogin from "./components/Candidate/CandidateLogin";
import Index from "./components/Candidate/Index";
import CandidateTest from "./components/Candidate/CandidatesTests";
import Score from "./components/Candidate/Score";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Landinpage /> }, // index instead of path="/"
      {
        path: "account",
        element: <LoginPage />,
        children: [
          { index: true, element: <SignupForm /> },
          { path: "login", element: <LoginForm /> },
        ],
      },
      {
        path: "dashboard",
        element: <Main />,
        children: [
          { index: true, element: <Dashboard /> }, // dashboard main page
          {
            path: "test",
            element: <Tests />,
            children: [
              { index: true, element: <TestList /> },
              { path: "new", element: <CreatTest /> },
              // { path: ":test_id", element: <TestDetail /> },
            ],
          },
          {
            path: "questions",
            element: <Questions />,
            children: [
              { index: true, element: <QuestionList /> },
              { path: "new", element: <CreateQuestion /> },
              { path: "detail", element: <QuestionDetail /> },
            ],
          },
          {
            path: "candidates",
            element: <Candidates />,
            children: [
              { index: true, element: <CandidateList /> },
              { path: ":candidate_id", element: <CandidateDetails /> },
            ],
          },
          { path: "result", element: <Result /> },
          { path: "profile", element: <Profile /> },
          { path: "settings", element: <Settings /> },
          { path: "support", element: <Support /> },
        ],
      },
      {
        path: ":instructor/tests/",
        element: <Index />,
        children: [
          { index: true, element: <CandidateLogin /> },
          {
            path: ":test_id",
            element: <CandidateTest />,
            children: [{ path: "score", element: <Score /> }],
          },
          { path: "register", element: <CandidateSignup /> },
        ],
      },
      // {
      //   path: "candidate",
      //   element: <Index />,
      //   children: [
      //     { index: true, element: <CandidateTests /> },
      //     { path: "login", element: <CandidateLogin /> },
      //   ],
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
