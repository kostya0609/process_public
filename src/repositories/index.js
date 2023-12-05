import {UserRepository}             from "./UserRepository";
import {AccessesRepository}         from "./AccessesRepository";
import {GridRepository}             from "./GridRepository"
import {MeetingRepository}          from "./MeetingRepository"

export const UserRepo               = new UserRepository();
export const AccessesRepo           = new AccessesRepository();
export const GridRepo               = new GridRepository();
export const MeetingRepo            = new MeetingRepository();
