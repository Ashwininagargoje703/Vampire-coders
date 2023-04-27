import { Box, Button, Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getRequest } from "../../../services/request";

function FourCardPage() {
  const [data, setData] = useState([]);

  function fetchData() {
    getRequest({
      url: `https://vampire.up.railway.app/post/getAllPublicPost`,
    })
      .then((res) => {
        setData(res?.data?.data);
        console.log("hello res", res.data);
      })
      .catch((e) => {
        setData([]);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMore = () => {
    window.location.href = "/joblisting";
  };
  return (
    <Box
      sx={{
        background: "white",
        height: "500px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box textAlign={"center"}>
        <Typography fontSize={40}>
          Hundreds of Jobs From All Over the Globe
        </Typography>
        {data.slice(0, 3).map((data, idx) => (
          <Card sx={{ p: 4, mb: 2 }}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Box textAlign={"left"}>
                <Typography>{data?.title}</Typography>
                <Typography fontWeight={600} fontSize={12}>
                  {data?.relatedTo}
                </Typography>
              </Box>
              <Typography display={"flex"} gap={2}>
                <LocationOnIcon /> {data?.location}
              </Typography>
            </Stack>
          </Card>
        ))}

        <Button
          onClick={handleLoadMore}
          sx={{
            backgroundColor: "white",
            border: "1px solid yellowgreen",
            borderRadius: "4px",
            color: "yellowgreen",
            mt: 2,
            p: 1.2,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "yellowgreen",
              color: "white",
            },
          }}
        >
          LOAD MORE LISTING
        </Button>
      </Box>
    </Box>
  );
}

export default FourCardPage;