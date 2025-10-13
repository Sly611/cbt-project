import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import CustomModal from "../views/menu/helpers/Modal";
import { useNavigate } from "react-router-dom";
import TestData from "./TestData";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import TestQuestions from "./TestQuestions";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

const CandidateTest = () => {
  const params = useParams();
  const token = localStorage.getItem("accessToken");
  const socketRef = useRef(null);
  const naviage = useNavigate();
  const [stage, setStage] = useState("");
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState("");
  const [time, setTime] = useState(null);
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    logo: null,
  });

  // ============================= QUESTION LOGIC =========================//
  const [questions, setQuestions] = useState([]);
  const [progress, setProgress] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [confirmModal, setConfirmModal] = useState(false);

  // ============================= SELECT CHOICE LOGIC =========================//

  const selectChoiceHandler = (event) => {
    const choice = Number(event.target.value);
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          action: "select",
          question: { id: questions[currentQuestionIndex].id, option: choice },
        })
      );
      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.status === "ok") {
          setProgress((prevProgress) => {
            const questionId = questions[currentQuestionIndex]?.id;
            if (!questionId) return prevProgress; // Defensive: skip if no question

            const idx = prevProgress.findIndex(
              (p) => p.question === questionId
            );

            if (idx !== -1) {
              const updated = [...prevProgress];
              updated[idx] = data.progress;
              return updated;
            } else {
              return [...prevProgress, data.progress];
            }
          });
        }
      };
    } else {
      console.warn("");
    }
  };

  const currentQuestionHandler = (action) => {
    if (action === "next") {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => ++prev);
      }
    } else if (action === "prev") {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prev) => --prev);
      }
    }
  };
  useEffect(() => {
    setStage("details");
    const socket = new WebSocket(
      `wss://cbt-api-version0-1.onrender.com/ws/test/${params.test_id}/?token=${token}`
    );
    setLoading(true);
    socket.onopen = () => {
      console.log("✅ Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status === "error") {
        setModal({
          open: true,
          title: "Hello!",
          message: data.message,
          logo: (
            <WarningAmberRoundedIcon
              color="warning"
              sx={{ width: "8rem", height: "8rem" }}
            />
          ),
        });
      } else if (data.status === "ok") {
        setTestData(data);
      }
    };

    socket.onclose = () => {
      console.warn("❌ WebSocket closed");
    };

    socketRef.current = socket;

    setLoading(false);
    return () => {
      socket.close();
    };
  }, [params.test_id, token]);

  //=========================START TEST FUNCTIONALITY===========================//

  const startTestHandler = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      setStage("start");
      if (testData.state === "Resume") {
        socketRef.current.send(JSON.stringify({ action: "resume" }));
      } else {
        socketRef.current.send(JSON.stringify({ action: "start" }));
      }
      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // console.log(data);
        if (data.status === "error") {
          setModal({
            open: true,
            title: "Hold up!",
            message: data.message,
            logo: (
              <HighlightOffRoundedIcon
                color="warning"
                sx={{ width: "8rem", height: "8rem" }}
              />
            ),
          });
        } else if (data.status === "ok") {
          setQuestions(data.message);
          setProgress(data.progress);
          if (data.time) {
            setTime(data.time);
          }
          console.log(data);
        }
      };
    } else {
      console.warn("⚠️ WebSocket not open, cannot send message");
    }
  };

  // ============================= SUBMIT HANDLER LOGIC =========================//

  const submitHandler = () => {
    const ws = socketRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      setModal({
        open: true,
        title: "Submission Error",
        message: "Unable to submit — connection closed.",
        logo: (
          <HighlightOffRoundedIcon
            color="error"
            sx={{ width: "8rem", height: "8rem" }}
          />
        ),
      });
      return;
    }

    const onMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        try {
          ws.close();
        } catch (_) {}

        if (data.status === "ok") {
          setStage("submitted");
          setQuestions([]);
          if (data.score !== undefined) {
            setModal({
              open: true,
              title: "Test Submitted!",
              message: `Your score: ${data.score}/${testData.test.total_score}`,
              logo: (
                <TaskAltRoundedIcon
                  color="success"
                  sx={{ width: "8rem", height: "8rem" }}
                />
              ),
            });
          } else {
            setModal({
              open: true,
              title: "Test Submitted!",
              message: "Your instructor will provide your score later.",
              logo: (
                <TaskAltRoundedIcon
                  color="success"
                  sx={{ width: "8rem", height: "8rem" }}
                />
              ),
            });
          }
        } else {
          setModal({
            open: true,
            title: "Submission Error",
            message: data.message || "Failed to submit test.",
            logo: (
              <HighlightOffRoundedIcon
                color="error"
                sx={{ width: "8rem", height: "8rem" }}
              />
            ),
          });
        }
      } catch (err) {
        console.error("submitHandler onMessage error:", err);
      } finally {
        ws && ws.removeEventListener("message", onMessage);
      }
    };

    ws.addEventListener("message", onMessage, { once: true });
    ws.send(
      JSON.stringify({
        action: "submit",
        show_score: testData.test.show_score_on_submit,
      })
    );
  };
  const handleTimeUp = () => {
    // Auto-submit the test on time up and show modal with score (if returned)
    const ws = socketRef.current;
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          action: "submit",
          show_score: testData.test.show_score_on_submit,
        })
      );

      const onMessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          try {
            ws && ws.close();
          } catch (e) {}
          if (data.status === "ok") {
            setStage("submitted");
            setQuestions([]);
            if (data.score !== undefined) {
              setModal({
                open: true,
                title: "Test Submitted!",
                message: `Your score: ${data.score}/${testData.test.total_score}`,
                logo: (
                  <TaskAltRoundedIcon
                    color="success"
                    sx={{ width: "8rem", height: "8rem" }}
                  />
                ),
              });
            } else {
              setModal({
                open: true,
                title: "Test Submitted!",
                message: "Your instructor will provide your score later.",
                logo: (
                  <TaskAltRoundedIcon
                    color="success"
                    sx={{ width: "8rem", height: "8rem" }}
                  />
                ),
              });
            }
          } else {
            setModal({
              open: true,
              title: "Submission Error",
              message: data.message || "Failed to auto-submit test.",
              logo: (
                <HighlightOffRoundedIcon
                  color="error"
                  sx={{ width: "8rem", height: "8rem" }}
                />
              ),
            });
          }
        } catch (err) {
          console.error("handleTimeUp onmessage error:", err);
        } finally {
          ws && ws.removeEventListener("message", onMessage);
        }
      };

      ws.addEventListener("message", onMessage);
    } else {
      // fallback: cannot reach server — inform user and navigate back
      setModal({
        open: true,
        title: "Time's up",
        message:
          "Your test time expired. Your answers were saved successfully.",
        logo: (
          <WarningAmberRoundedIcon
            color="warning"
            sx={{ width: "8rem", height: "8rem" }}
          />
        ),
      });
    }
  };

  // ============================= MODAL HANDLER LOGIC =========================//

  const closeModal = () => {
    setModal({ ...modal, open: false });
    naviage(-1);
  };

  if (stage === "details") {
    return (
      <Box>
        <CustomModal
          title={modal.title}
          message={modal.message}
          badge={modal.logo}
          open={modal.open}
          close={closeModal}
          buttonHandler={closeModal}
          buttonText="Ok"
        />
        {testData ? (
          <TestData
            course_title={testData.test.course_title}
            description={testData.test.description}
            scheduled_start={testData.test.scheduled_start}
            duration={testData.test.duration}
            session_duration={testData.test.session_duration}
            total_questions={testData.test.total_questions}
            total_score={testData.test.total_score}
            show_score_on_submit={testData.test.show_score_on_submit}
            startTestHandler={startTestHandler}
            button={testData.state}
          />
        ) : (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Typography variant="h6">
              Loading <CircularProgress size="1rem" />
            </Typography>
          </Container>
        )}
      </Box>
    );
  }
  if (stage === "start") {
    return (
      <Box>
        <CustomModal
          open={confirmModal}
          title="Submit Test?"
          message="Are you sure you want to submit your test? You won't be able to change your answers after this."
          buttonText="Submit"
          close={() => setConfirmModal(false)}
          buttonHandler={submitHandler}
        />
        {questions?.length > 0 && questions[currentQuestionIndex] && (
          <TestQuestions
            socket={socketRef}
            course={testData.test.course_title}
            question={questions[currentQuestionIndex]}
            choices={questions[currentQuestionIndex].options}
            selectHandler={selectChoiceHandler}
            nav={currentQuestionHandler}
            duration={testData.test.session_duration}
            time={time}
            progress={progress}
            currentQuestion={currentQuestionIndex}
            total_questions={testData.test.total_questions}
            onSubmit={() => setConfirmModal(true)}
            onTimeUp={handleTimeUp}
          />
        )}
      </Box>
    );
  }
  if (stage === "submitted") {
    return (
      <CustomModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        badge={modal.logo}
        buttonHandler={closeModal}
        buttonText="Ok"
      />
    );
  }
};

export default CandidateTest;
