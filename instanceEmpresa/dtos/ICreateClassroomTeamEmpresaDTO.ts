import {ICreateClassroomTeamDTO} from '../../Core/src/modules/classrooms/dtos/ICreateClassroomTeamDTO'

interface ICreateClassroomTeamEmpresaDTO extends ICreateClassroomTeamDTO{
    role : number;
}

export {ICreateClassroomTeamEmpresaDTO}