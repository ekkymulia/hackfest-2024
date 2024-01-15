Thena Works - Team Thena
Hackfest 2024

================
Backend Repo

API Endpoint:

Projects

menampilkan seluruh projects (bisa dengan filter)


GET: url/api/v1/projects


optional filter: body{
    status: 0, 1, 2..., 
    owner_id: userId, 
    asignee_needed: number,
}



menampilkan project berdasarkan id


GET: url/api/v1/projects/{id}

update project




PUT: url/api/v1/projects/{id}


required body{
    status, (required),
    asignee_needed, (optional),
    wanted_deadline, (optional),
    target_deadline, (optional),
    title, (optional),
    description, (optional),
}



delete project (softdelete)


DELETE: url/api/v1/projects/{id}


body{
   userId (required)
}

status
0: project tidak aktif
1: project baru
2: mencari freelancer (project baru client disetujui manager/reviewer, siap untuk assign freelancer)
