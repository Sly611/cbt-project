const CandidateDetails = () => {
  const { loading, request } = useApi();
  const { candidate_id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [apr, setApr] = useState(0); // ✅ New state to store APR

  const getTest = async (test_id) => {
    const response = await request({
      auth: true,
      method: "GET",
      url: `/instructor/test/detail/${test_id}/`,
    });
    return response;
  };

  const getApr = async (tests) => {
    let passed_tests = 0;

    for (let i = 0; i < tests.length; i++) {
      const test = await getTest(tests[i].id);
      if (!test || !test.total_score) continue;

      const score_percent = (tests[i].score / test.total_score) * 100;
      if (score_percent > 0) {
        passed_tests++;
      }
    }

    return (passed_tests / tests.length) * 100;
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      const response = await request({
        method: "GET",
        url: `/instructor/test/candidate/${candidate_id}/`,
        auth: true,
      });
      if (response) setCandidate(response);
    };
    fetchCandidate();
  }, [candidate_id]);

  // ✅ Separate effect to calculate APR once candidate is loaded
  useEffect(() => {
    if (candidate && candidate.tests_detail?.length > 0) {
      (async () => {
        const aprValue = await getApr(candidate.tests_detail);
        setApr(aprValue.toFixed(1)); // ✅ store once
      })();
    }
  }, [candidate]);

  if (loading || !candidate) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 700, mt: 5, p: 2, borderRadius: 3 }}>
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AccountCircleIcon sx={{ fontSize: 80, color: "primary.main" }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {getTitleCase(candidate.first_name)}{" "}
                {getTitleCase(candidate.last_name)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {candidate.email}
              </Typography>
              <Chip
                label={candidate.reg_number || "No Reg Number"}
                color="primary"
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2" color="text.secondary">
              Pass Rate
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {apr ?? 0}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
