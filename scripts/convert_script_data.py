import xml.etree.ElementTree as ET
import json

def convert_xml_to_json(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()

    data = {}

    for game in root.findall(".//Game"):
        game_ids = {k: v for k, v in game.attrib.items() if "id" in k}
        game_data = {}

        game_variables_table = game.find(".//GameVariablesTable")
        if game_variables_table is not None:
            game_data["gameVariables"] = []
            for game_var in game_variables_table.findall(".//GameVar"):
                game_data["gameVariables"].append({
                    "name": game_var.attrib["name"],
                    "type": int(game_var.attrib["type"]),
                    "unk1": int(game_var.attrib["unk1"]),
                    "memOffset": int(game_var.attrib["memoffset"], 16),
                    "bitShift": int(game_var.attrib["bitshift"], 16),
                    "nbValues": int(game_var.attrib["nbvalues"], 16),
                    "unk4": int(game_var.attrib["unk4"], 16)
                })

        game_variables_table_extended = game.find(".//GameVariablesTableExtended")
        if game_variables_table_extended is not None:
            game_data["gameVariablesExtended"] = []
            for game_var in game_variables_table_extended.findall(".//GameVar"):
                game_data["gameVariablesExtended"].append({
                    "name": game_var.attrib["name"],
                    "type": int(game_var.attrib["type"]),
                    "unk1": int(game_var.attrib["unk1"], 16),
                    "memOffset": int(game_var.attrib["memoffset"], 16),
                    "bitShift": int(game_var.attrib["bitshift"], 16),
                    "nbValues": int(game_var.attrib["nbvalues"], 16),
                    "unk4": int(game_var.attrib["unk4"], 16)
                })

        face_names = game.find(".//FaceNames")
        if face_names is not None:
            game_data["faceNames"] = [face.text for face in face_names.findall(".//Face")]

        face_position_modes = game.find(".//FacePositionModes")
        if face_position_modes is not None:
            game_data["facePositionModes"] = [mode.text for mode in face_position_modes.findall(".//Mode")]

        directions = game.find(".//Directions")
        if directions is not None:
            game_data["directions"] = [{"id": int(direction.attrib["_id"]), "name": direction.text} for direction in directions.findall(".//Direction")]

        common_routine_info = game.find(".//CommonRoutineInfo")
        if common_routine_info is not None:
            game_data["commonRoutineInfo"] = [{"id": int(routine.attrib["id"]), "unk1": int(routine.attrib["unk1"]), "name": routine.attrib["name"]} for routine in common_routine_info.findall(".//Routine")]

        menu_ids = game.find(".//MenuIds")
        if menu_ids is not None:
            game_data["menuIds"] = [{"id": int(menu.attrib["id"]), "name": menu.attrib["name"]} for menu in menu_ids.findall(".//Menu")]

        process_special_ids = game.find(".//ProcessSpecialIDs")
        if process_special_ids is not None:
            game_data["processSpecialIds"] = [{"id": int(special.attrib["id"]), "name": special.attrib["name"]} for special in process_special_ids.findall(".//Special")]

        sprite_effect_ids = game.find(".//SpriteEffectIDs")
        if sprite_effect_ids is not None:
            game_data["spriteEffectIds"] = [{"id": int(effect.attrib["id"]), "name": effect.attrib["name"]} for effect in sprite_effect_ids.findall(".//Effect")]

        background_music_ids = game.find(".//BackgroundMusicIDs")
        if background_music_ids is not None:
            game_data["backgroundMusicIds"] = [bgm.text for bgm in background_music_ids.findall(".//Bgm")]
        
        op_codes = game.find(".//OpCodes")
        if op_codes is not None:
            game_data["opCodes"] = []
            for op_code in op_codes.findall(".//OpCode"):
                opcode_data = {
                    "id": int(op_code.attrib["id"], 16),
                    "name": op_code.attrib["name"],
                    "params": int(op_code.attrib["params"]),
                    "stringidx": int(op_code.attrib["stringidx"]),
                    "unk2": int(op_code.attrib["unk2"]),
                    "unk3": int(op_code.attrib["unk3"])
                }
                if opcode_data["params"] > 0:
                    opcode_data["arguments"] = []
                    for arg in op_code.findall("Argument"):
                        opcode_data["arguments"].append({
                            "id": int(arg.attrib["id"]),
                            "type": arg.attrib["type"],
                            "name": arg.attrib["name"]
                        })
                elif opcode_data["params"] == -1:
                    opcode_data["arguments"] = []
                    for arg in op_code.findall("Argument"):
                        opcode_data["arguments"].append({
                            "id": int(arg.attrib["id"]),
                            "type": arg.attrib["type"],
                            "name": arg.attrib["name"]
                        })
                        if arg.attrib["type"] == "PositionMark":
                            # In the XML, PositionMark is counted as 3 arguments. This matches the SSB representation,
                            # but the language server counts it as 1 argument.
                            opcode_data["params"] -= 3 
                    for repeating_arg_group in op_code.findall("RepeatingArgumentGroup"):
                        repeating_args = {
                            "id": int(repeating_arg_group.attrib["id"]),
                            "repeating": True,
                            "arguments": []
                        }
                        for arg in repeating_arg_group.findall("Argument"):
                            repeating_args["arguments"].append({
                                "type": arg.attrib["type"], 
                                "name": arg.attrib["name"]
                            })
                            if arg.attrib["type"] == "PositionMark":
                                opcode_data["params"] -= 3
                        opcode_data["arguments"].append(repeating_args)
                game_data["opCodes"].append(opcode_data)

        ground_state_structs = game.find(".//GroundStateStructs")
        if ground_state_structs is not None:
            game_data["groundStateStructs"] = []
            for struct in ground_state_structs.findall("*"):
                game_data["groundStateStructs"].append({
                    "name": struct.tag,
                    "offset": int(struct.attrib["offset"]),
                    "entryLength": int(struct.attrib["entrylength"], 16),
                    "maxEntries": int(struct.attrib["maxentries"])
                })

        level_list = game.find(".//LevelList")
        if level_list is not None:
            game_data["levelList"] = []
            for level in level_list.findall(".//Level"):
                game_data["levelList"].append({
                    "name": level.attrib["name"],
                    "mapty": int(level.attrib["mapty"]),
                    "unk2": int(level.attrib["unk2"]),
                    "mapid": int(level.attrib["mapid"]),
                    "unk4": int(level.attrib["unk4"])
                })

        lives_entity_table = game.find(".//LivesEntityTable")
        if lives_entity_table is not None:
            game_data["livesEntityTable"] = []
            for entity in lives_entity_table.findall(".//Entity"):
                game_data["livesEntityTable"].append({
                    "name": entity.attrib["name"],
                    "type": int(entity.attrib["type"]),
                    "entid": int(entity.attrib["entid"]),
                    "unk3": int(entity.attrib["unk3"], 16),
                    "unk4": int(entity.attrib["unk4"], 16)
                })
        
        objects_list = game.find(".//ObjectsList")
        if objects_list is not None:
            game_data["objectsList"] = []
            for obj in objects_list.findall(".//Object"):
                game_data["objectsList"].append({
                    "unk1": int(obj.attrib["unk1"]),
                    "unk2": int(obj.attrib["unk2"]),
                    "unk3": int(obj.attrib["unk3"]),
                    "name": obj.attrib["name"]
                })

        data[", ".join(game_ids.values())] = game_data

    return json.dumps(data, indent=4)

# Example usage:
json_output = convert_xml_to_json("pmd2scriptdata.xml")  # Replace with your XML file
print(json_output)

with open("output.json", "w") as f:
    f.write(json_output)