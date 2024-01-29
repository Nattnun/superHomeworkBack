env

## PORT=

service api

path method params body
/auth/register POST none {s_code, password,confirmPassword, firstname,email}
/auth/login POST none {t_code or s_code , password}
