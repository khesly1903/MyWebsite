import {
  Container,
  Box,
  Typography,
  Stack,
  CardMedia,
  Grid,
  Divider,
} from "@mui/material";
import TextType from "../components/TextType";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ScrollHint from "../components/ScrollHint";
import ScrollToTop from "../components/ScrollToTop";

export default function HomePage() {
  const schools = [
    {
      school:
        "Bachelor’s Degree in <strong>Mathematics</strong>—Istinye University",
    },
    {
      school:
        " Minor in <strong>Software Engineering</strong>—Istinye University",
    },
    {
      school:
        "Associate Degree in <strong>Computer Programming</strong>—Istanbul University",
    },
  ];

  const courses = [
    {
      course: "Fullstack .Net and React Bootcamp - Istanbul Education Academy",
    },
    { course: " CCNA-1 and CCNA-2 - Cisco Networking Academy" },
    { course: "CS50x and CS50p - edX Harvard University " },
  ];

  const technologies = {
    backend: [
      {
        skill: "JavaScript",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
        ),
      },
      {
        skill: "Python",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
        ),
      },
      {
        skill: "TypeScript",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
        ),
      },
      {
        skill: "ExpressJS",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" />
        ),
      },
      {
        skill: "NestJS",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" />
        ),
      },
      {
        skill: "MongoDB",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" />
        ),
      },
      {
        skill: ".Net",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" />
        ),
      },
      {
        skill: "SQL Server",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg" />
        ),
      },
    ],
    frontend: [
      {
        skill: "ReactJs",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
        ),
      },
      {
        skill: "NextJS",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
        ),
      },
      {
        skill: "TailwindCSS",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />
        ),
      },
      {
        skill: "Material UI",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg" />
        ),
      },
      {
        skill: "AntDesign",
        icon: (
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/antdesign/antdesign-original.svg" />
        ),
      },
    ],
  };
  const skills = {
    mathSkills: [
      { skill: "Abstract Mathematics" },
      { skill: "Elliptic Curves" },
      { skill: "Field Theory" },
    ],
    cryptoSkills: [
      { skill: "Elliptic Curve Cryptography" },
      { skill: "ElGamal" },
      { skill: "Pre-Modern Ciphers " },
      { skill: "Modern and Post-Quantum Cryptosystems" },
    ],
  };

  const socails = [
    {
      name: "github",
      link: "https://github.com/khesly1903",
      icon: <GitHubIcon fontSize="large" />,
    },
    {
      name: "linkedin",
      link: "https://www.linkedin.com/in/berkay-kaya-3a8bb0235/",
      icon: <LinkedInIcon fontSize="large" />,
    },
  ];

  return (
    <Container
      maxWidth={false}
      sx={{ width: "100%" }}
      className="repeating-bg2"
    >
      <ScrollHint />
      <ScrollToTop />
      <Box
        sx={{
          px: 4,
          py: 6,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: "column", md: "row" }}
          m={"2rem 0"}
        >
          {/* left side - photo */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CardMedia
                component="img"
                image="/BerkayKayaAI.jpeg"
                alt="profile"
                sx={{
                  width: { xs: "70%", sm: "50%", md: "20rem" },
                  height: "auto",
                  borderRadius: "1rem",
                  objectFit: "cover",
                  boxShadow: "0 4px 20px rgba(255, 255, 255, 0.34)",
                }}
              />
            </Box>
          </Grid>

          {/*right side - about me */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <TextType
              text={[" I'm Berkay "]}
              style={{ fontSize: "3rem", fontWeight: 600 }}
              typingSpeed={250}
              pauseDuration={0}
              loop={true}
              deletingSpeed={200}
              showCursor={true}
              cursorCharacter="_"
            />

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: "36rem",
                mx: { xs: "auto", md: 0 },
                fontFamily: "Texturina, serif",
                // fontFamily: "Iceberg, serif",
                // fontFamily: "Tomorrow, sans-serif",
                fontSize: "1.3rem",
              }}
            >
              I’m a mathematician with a passion for software development and
              cryptography. Over time, I’ve focused on web development,
              specializing in the MERN stack. I'm not just sharing my CV here as
              a website. I share articles and tutorials about cryptography and
              mathematics. You can also explore my projects and find their
              source code on my GitHub.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          sx={{
            position: "absolute",
            bottom: 0,
            mt: "1rem",
            mb:" 1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            {socails.map((social, key) => (
              <Box
                key={key}
                component="a"
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "white", textDecoration: "none"}}
              >
                {social.icon}
              </Box>
            ))}
          </Stack>
        </Grid>
      </Box>

      {/* 2️⃣ Okul bilgisi */}
      <Box>
        <Divider>
          <Typography
            variant="h4"
            fontWeight={600}
            gutterBottom
            sx={{ fontFamily: "Iceberg, sans-serif" }}
          >
            Schools and Courses
          </Typography>
        </Divider>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", md: "45%" },
            }}
          >
            <Box sx={{ m: "1rem", p: "1rem" }}>
              {schools.map((item, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    fontFamily: "Texturina, serif",
                    fontSize: "1.2rem",
                    textAlign: "center",
                  }}
                  dangerouslySetInnerHTML={{ __html: item.school }}
                />
              ))}
            </Box>
          </Box>

          {/* Küçük ekranlar (horizontal) */}
          <Divider
            orientation="horizontal"
            flexItem
            sx={{
              width: "80%",
              bgcolor: "divider",
              display: { xs: "block", md: "none" },
              margin: "0 auto",
            }}
          />

          {/* Büyük ekranlar (vertical) */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              bgcolor: "divider",
              display: { xs: "none", md: "block" },
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", md: "45%" },
            }}
          >
            <Box sx={{ m: "1rem", p: "1rem" }}>
              {courses.map((item, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    fontFamily: "Texturina, serif",
                    fontSize: "1.2rem",
                    textAlign: "center",
                  }}
                  dangerouslySetInnerHTML={{ __html: item.course }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* tech */}
      <Box>
        <Divider>
          <Typography
            variant="h4"
            fontWeight={600}
            gutterBottom
            sx={{ fontFamily: "Iceberg, sans-serif" }}
          >
            Technologies
          </Typography>
        </Divider>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", md: "45%" },
            }}
          >
            <Box
              sx={{
                m: "1rem",
                p: "1rem",
                display: "flex",
                flexWrap: "wrap", // 👈 elemanlar taşarsa alt satıra geçer
                justifyContent: "center", // 👈 ortalama
                gap: "2rem", // 👈 elemanlar arası boşluk
              }}
            >
              {technologies.backend.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: { xs: "40%", sm: "25%", md: "15%" }, // 👈 responsive genişlik
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ width: 48, height: 48, mx: "auto", mb: 1 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="body2">{item.skill}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Küçük ekranlar (horizontal) */}
          <Divider
            orientation="horizontal"
            flexItem
            sx={{
              width: "80%",
              bgcolor: "divider",
              display: { xs: "block", md: "none" },
              margin: "0 auto",
            }}
          />

          {/* Büyük ekranlar (vertical) */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              bgcolor: "divider",
              display: { xs: "none", md: "block" },
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", md: "45%" },
            }}
          >
            <Box
              sx={{
                m: "1rem",
                p: "1rem",
                display: "flex",
                flexWrap: "wrap", // 👈 elemanlar taşarsa alt satıra geçer
                justifyContent: "center", // 👈 ortalama
                gap: "2rem", // 👈 elemanlar arası boşluk
              }}
            >
              {technologies.frontend.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: { xs: "40%", sm: "25%", md: "15%" }, // 👈 responsive genişlik
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ width: 48, height: 48, mx: "auto", mb: 1 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="body2">{item.skill}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* know */}
      <Box>
        <Divider>
          <Typography
            variant="h4"
            fontWeight={600}
            gutterBottom
            sx={{ fontFamily: "Iceberg, sans-serif" }}
          >
            Things that I have an idea
          </Typography>
        </Divider>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", md: "45%" },
            }}
          >
            <Box sx={{ m: "1rem", p: "1rem", textAlign: "center" }}>
              {skills.mathSkills.map((item, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{ fontFamily: "Texturina, serif", fontSize: "1.2rem" }}
                  dangerouslySetInnerHTML={{ __html: item.skill }}
                />
              ))}
            </Box>
          </Box>

          {/* Küçük ekranlar (horizontal) */}
          <Divider
            orientation="horizontal"
            flexItem
            sx={{
              width: "80%",
              bgcolor: "divider",
              display: { xs: "block", md: "none" },
              margin: "0 auto",
            }}
          />

          {/* Büyük ekranlar (vertical) */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              bgcolor: "divider",
              display: { xs: "none", md: "block" },
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", md: "45%" },
            }}
          >
            <Box sx={{ m: "1rem", p: "1rem", textAlign: "center" }}>
              {skills.cryptoSkills.map((item, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{ fontFamily: "Texturina, serif", fontSize: "1.2rem" }}
                  dangerouslySetInnerHTML={{ __html: item.skill }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <div
      style={{
        backgroundColor: "#0b0c10",
        color: "#f5f5f5",
        padding: "2rem",
        fontSize: "1.1rem",
        lineHeight: 1.6,
      }}
    >
      <section style={{ fontFamily: "Iceberg, sans-serif", marginBottom: "2rem" }}>
        <h1>Iceberg</h1>
        <p>Smooth and futuristic — perfect for modern UI and minimal designs.</p>
      </section>

      <section style={{ fontFamily: "Almendra, serif", marginBottom: "2rem" }}>
        <h1>Almendra</h1>
        <p>Elegant and classic — evokes the feel of an old manuscript or tale.</p>
      </section>

      <section style={{ fontFamily: "Texturina, serif", marginBottom: "2rem" }}>
        <h1>Texturina</h1>
        <p>Readable and stylish — great balance between art and legibility.</p>
      </section>

      <section style={{ fontFamily: "Tomorrow, sans-serif", marginBottom: "2rem" }}>
        <h1>Tomorrow</h1>
        <p>Clean, geometric, and futuristic — made for tech-driven layouts.</p>
      </section>

      <section style={{ fontFamily: "Pirata One, cursive", marginBottom: "2rem" }}>
        <h1>Pirata One</h1>
        <p>Bold, dramatic, and medieval — adds personality to fantasy designs.</p>
      </section>
    </div> */}
    </Container>
  );
}
