import {ProcessRepository}      from "./ProcessRepository";
import {TemplateRepository}     from "./TemplateRepository"
import {UserRepository}         from "./UserRepository";
import {TypeRepository}         from "./TypeRepository";
import {ParticipantRepository}  from "./ParticipantRepository";


export const ProcessRepo         = new ProcessRepository();
export const TemplateRepo        = new TemplateRepository();
export const UserRepo            = new UserRepository();
export const TypeRepo            = new TypeRepository();
export const ParticipantRepo     = new ParticipantRepository();
