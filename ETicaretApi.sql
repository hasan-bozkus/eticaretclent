--
-- PostgreSQL database cluster dump
--

-- Started on 2023-12-27 16:53:34

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.5

-- Started on 2023-12-27 16:53:35

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2023-12-27 16:53:35

--
-- PostgreSQL database dump complete
--

--
-- Database "ETicaretApiDb" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.5

-- Started on 2023-12-27 16:53:35

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3315 (class 1262 OID 16397)
-- Name: ETicaretApiDb; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "ETicaretApiDb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Turkish_Türkiye.1254';


ALTER DATABASE "ETicaretApiDb" OWNER TO postgres;

\connect "ETicaretApiDb"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2023-12-27 16:53:35

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.5

-- Started on 2023-12-27 16:53:35

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3316 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


-- Completed on 2023-12-27 16:53:35

--
-- PostgreSQL database dump complete
--

-- Completed on 2023-12-27 16:53:35

--
-- PostgreSQL database cluster dump complete
--

