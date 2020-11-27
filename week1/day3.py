# print('enter length')
# length = int(input())
# print('enter breadth')
# breadth = int(input())
# if(length==breadth):
#     print("es un cuadrado")
# else:
#     print("no es un cuadrado")
# print('enter m')
# length = int(input())
# print('enter n')
# breadth = int(input())
# if(length<breadth):
#     print("the second is the most big")
# else:
#     print("the first is the most big")

# dict1 = {
#     'carlos':3,
#     'camilo':3
# }
# dict1['perez']=4
# print(dict1)
# keys= ['ten',"twenty","thirty"]
# values = [10,20,30]
# dict2 = dict()
# for i,val in enumerate(keys):
#     dict2[val]= values[i]
# print(dict2)
sampleDict = {
    "class":{
        "student":{
            "name":"Myke",
            "marks":{
                "physics":70,
                "history":80
            }
        }
    }
}
print(sampleDict["class"]["student"]["marks"]["history"])

inventory = {
    "gold":500,
    "pouch":['flint',"twine","gemstone"],
    "backpack":["pap","perro","student","soaf"]
}
inventory["pocket"]= ['seashell','strange',"lint"]
inventory['backpack'].sort()
inventory['backpack'].remove("perro")
inventory['gold']+=50
print(inventory)
