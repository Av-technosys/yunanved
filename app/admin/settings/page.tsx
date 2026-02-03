"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfilePage() {
  return (
    <div className="max-w-full space-y-4">
      {/* Header */}
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://i.pravatar.cc/100" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-muted-foreground">
                Mansarovar, Jaipur
              </p>
            </div>
          </div>

          <Button
            className="w-44 rounded-full bg-black text-white"
            variant="outline"
          >
            Change Photo
          </Button>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>First Name</Label>
              <Input placeholder="Enter Your First Name"/>
            </div>

            <div className="space-y-1.5">
              <Label>Last Name</Label>
              <Input placeholder="Enter Your Last Name"/>
            </div>

            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input placeholder="Enter Email" />
            </div>

            <div className="space-y-1.5">
              <Label>Mobile No.</Label>
              <Input placeholder="Enter Mobile No." />
            </div>

            <div className="space-y-1.5">
              <Label>Gender</Label>
              <Select defaultValue="male">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input placeholder="Enter Password" type="password" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button className="w-44 rounded-full" variant="outline">
              Cancel
            </Button>
            <Button className="bg-[#245E63] w-44 rounded-full text-white hover:bg-[#1F5155]">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Change Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Current Password</Label>
              <Input placeholder="Enter Current Password" type="password" />
            </div>

            <div />

            <div className="space-y-1.5">
              <Label>New Password</Label>
              <Input placeholder="Enter New Password" type="password" />
            </div>

            <div className="space-y-1.5">
              <Label>Confirm Password</Label>
              <Input placeholder="Confirm New Password" type="password" />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            • Must be 8 digit password
          </p>

          <div className="flex justify-end gap-3">
            <Button className="w-44 rounded-full" variant="outline">
              Cancel
            </Button>
            <Button className="bg-[#245E63] w-44 rounded-full text-white hover:bg-[#1F5155]">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="font-medium">Logout</p>
            <p className="text-sm text-muted-foreground">
              End your current session safely
            </p>
          </div>

          <Button
            className="bg-[#245E63] w-44 rounded-full text-white hover:bg-[#1F5155]"
            variant="destructive"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
